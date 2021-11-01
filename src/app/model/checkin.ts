export interface CheckinModel {
  name: string;
  address: string;
  zipCode: string;
  city: string;
  timeWork: {
    hours: number;
    minutes: number;
  };
  timeCheck?: Date;
}
