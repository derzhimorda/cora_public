import { ApiErrorConfig } from "../../model/infrastructure/api-error-config";

export const autErrorConfig: ApiErrorConfig  = {
  'api/auth':
    [
      {'loginOrPasswordNotFound': 'Ungültige Anmeldung und / oder ungültiges Passwort.' },
      {'emailNotFound': 'E-Mail nicht gefunden.' },
      {'cellularNotFound': 'Telefon nicht gefunden.' },
      {'emptyLogin': 'Login darf nicht leer sein' },
      {'notificationNotSend': 'Benachrichtigung wurde nicht gesendet' }
    ]
}
