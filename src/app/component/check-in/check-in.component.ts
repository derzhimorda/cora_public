import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth.service';
import { GuestService } from '../../service/guest.service';
import { SessionService } from '../../service/session.service';
import  jsQR, { QRCode } from 'jsqr'
import { Point } from 'jsqr/dist/locator';
import { QrCodeModel } from '../../model/qrCode';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit, AfterViewInit {
  imageContainer: HTMLElement | null;
  cameraContainer: HTMLElement | null;
  canvasElement: HTMLCanvasElement | null = null;
  canvasContext: CanvasRenderingContext2D | null = null;
  video: HTMLVideoElement | null = null;
  videoStatus?: string = undefined;
  hasCamera = false;
  startedScanning = false;
  isPressed = false;
  isReady = false;

  private cameraProblem?: string = undefined

  constructor(private router: Router, private messageService: MessageService, private sessionService: SessionService, private modelService: GuestService, private authService: AuthService) {
    this.imageContainer = document.getElementById('imageContainer');
    this.cameraContainer = document.getElementById('cameraContainer');
  }

  ngOnInit(): void {
    const localQrCode = this.modelService.localQrCode;
    if (localQrCode) {
      const model: QrCodeModel = { qrCode: localQrCode };
      this.modelService
        .checkIn(model).subscribe(
          () => {
            this.modelService.localQrCode = null;
            this.sessionService.session.isCheckedIn = true;
            this.router.navigate(['check-out']);
          },
          (error) => {
            this.modelService.localQrCode = null;
            if (error && error instanceof Array) {
              error.forEach(item => {
                const message: Message = { severity: 'error', summary: 'Error', detail: item as string };
                this.messageService.add(message);
              })
            }
          });       
    }
  }

  ngAfterViewInit(): void {
    this.imageContainer = document.getElementById('imageContainer');
    this.cameraContainer = document.getElementById('cameraContainer');
    if (this.cameraContainer) {
      this.cameraContainer.style.display = 'none';
    }
    this.video = document.createElement('video') as HTMLVideoElement;
    this.canvasElement = document.querySelector('canvas');
    this.canvasContext = this.canvasElement?.getContext('2d') as CanvasRenderingContext2D;
  }

  public settingsClick() {
    this.router.navigate(['test']);
  }

  public scanClick() {
    this.startedScanning = true;
    navigator.mediaDevices
             .getUserMedia({ audio: false, video: { facingMode: 'environment' }})
             .then((stream: MediaStream) => {
               if (this.imageContainer) {
                 this.imageContainer.style.display = 'none';
               }
               if (this.cameraContainer) {
                 this.cameraContainer.style.display = 'block';
               }
               if (this.video) {
                 this.video.srcObject = stream;
                 this.video.setAttribute('playsinline', 'true');
                 this.video.play();
                 requestAnimationFrame(this.tick.bind(this));
               }
               else{
                this.cameraProblem = `Error: Videocontainer ist undefiniert`;
               }
             })
             .catch((error) => {
               this.hasCamera = false;
               if ('message' in error) {
                 this.cameraProblem = `Error: ${error.message}`;
               }
             }); 
  }

  public checkinClick() {
    this.isPressed = true;
    if (this.videoStatus) {
      const model: QrCodeModel = { qrCode: this.videoStatus };
      this.modelService
        .checkIn(model).subscribe(
          () => {
            this.isPressed = false;
            this.hasCamera = false;
            this.startedScanning = false;
            this.sessionService.session.isCheckedIn = true;
            this.router.navigate(['check-out']);
          },
          (error) => {
            this.isPressed = false;
            if (error && error instanceof Array) {
              error.forEach(item => {
                const message: Message = { severity: 'error', summary: 'Error', detail: item as string };
                this.messageService.add(message);
              })
            }
          });
    }
  }

  public logoutClick() {
    this.authService.logoff().subscribe(
      () => {
        this.sessionService.clearSession();
        this.router.navigate(['login']);
      },
      (error) => {
        this.isPressed = false;
        if (error && error instanceof Array) {
          error.forEach(item => {
            const message: Message = { severity: 'error', summary: 'Error', detail: item as string };
            this.messageService.add(message);
          })
        }
      }
    );
  }

  public get lotNumber(): string {
    return this.sessionService.session.lotNumber ?? 'Nicht definiert';
  }

  public get cameraProblemResult(): string|undefined {
    if (!this.startedScanning){
      return undefined;
    }

    return this.hasCamera ? undefined : this.cameraProblem;
  }

  public get hasQrCode(): boolean{
    return this.videoStatus !== undefined;
  }

  public cancelClick(){
    this.startedScanning = false;
    if (this.imageContainer){
      this.imageContainer.style.display = 'block';
    }
    if (this.cameraContainer) {
      this.cameraContainer.style.display = 'none';
    }
  }

  private tick(): void {
   if (this.video !== null && this.canvasElement !== null && this.canvasContext  !== null) {
     if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
       this.canvasElement.hidden = false;
       this.canvasElement.height = this.video.videoHeight;
       this.canvasElement.width = this.video.videoWidth;
       this.canvasContext.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
       const imageData: ImageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
       const code: QRCode | null = jsQR(imageData.data, imageData.width, imageData.height);
       if (code !== null) {
         this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
         this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
         this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
         this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
         this.videoStatus = code.data;
       }
     }
     requestAnimationFrame(this.tick.bind(this));
   }
  }

  private drawLine(begin: Point, end: Point, color: string | CanvasGradient | CanvasPattern): void {
   if (this.canvasContext !== null) {
     this.canvasContext.beginPath();
     this.canvasContext.moveTo(begin.x, begin.y);
     this.canvasContext.lineTo(end.x, end.y);
     this.canvasContext.lineWidth = 4;
     this.canvasContext.strokeStyle = color;
     this.canvasContext.stroke();
   }
  }
}
