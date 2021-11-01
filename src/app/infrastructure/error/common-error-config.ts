import { ApiErrorConfig } from "../../model/infrastructure/api-error-config";

export const commonErrorConfig: ApiErrorConfig  = {
    'common': [
    { 'tokenNotFound': 'Ungültiges Token.' },
    { 'accessDenied': 'Zugriff verweigert' },
    { 'emailIsEmpty': 'E-Mail ist leer' },
    { 'passwordNotChange': 'Passwort nicht geändert' },
    { 'tokenNotFound': 'Token nicht gefunden' },
    { 'passwordNotChanged': 'Passwort nicht geändert' },
    { 'notConfirmPassword': 'Sie haben das Passwort nicht bestätigt' }
    ]
}
