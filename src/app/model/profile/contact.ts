export interface ContactModel {
    cellular?: string;
    email?: string;
    password?: string;
}

export const newContact: ContactModel = {
  cellular: '',
  email: '',
  password:''
}
