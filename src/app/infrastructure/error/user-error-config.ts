import { ApiErrorConfig } from "../../model/infrastructure/api-error-config";

export const userErrorConfig: ApiErrorConfig  = {
  'api/user': [
    {'emptyFirstName': 'Der Vorname darf nicht leer sein.' },
    {'emptyLastName': 'Nachname darf nicht leer sein.' },
    {'inccorectBirthDate': 'Falsches Geburtsdatum.' },
    {'emptyCountry': 'Land kann nicht leer sein.' },
    {'emptyCity': 'Stadt kann nicht leer sein.' },
    {'emptyStreet': 'Straße kann nicht leer sein.' },
    {'emptyHouse': 'Haus kann nicht leer sein.' },
    {'emptyPassword': 'Passwort darf nicht leer sein.' },
    {'badPassword': 'Falsches Passwort.' },
    {'inccorectEmail': 'Ungültige E-Mail.' },
    {'inccorectCellular': 'Ungültiges Telefon.' },
    {'notAcceptSharedData': 'Datenfreigabe akzeptieren ist nicht ausgewählt.' },
    {'notAcceptAgreement': 'Vereinbarung akzeptieren ist nicht ausgewählt.' },
    {'emailIsExists': 'Mitarbeiter mit einer solchen E-Mail ist bereits vorhanden' },
    {'emailIsExists': 'Mitarbeiter mit einem solchen Telefon ist bereits vorhanden' },
    {'existesEmail': 'Mitarbeiter mit einem solchen Telefon ist bereits vorhanden' },
    {'existCellular': 'Mitarbeiter mit einem solchen Telefon ist bereits vorhanden' },
    {'cantVerifyProfile': 'Ungültiger PIN-Code'},
    {'locationNotFound': 'Ort nicht gefunden.'}    
  ]
}
