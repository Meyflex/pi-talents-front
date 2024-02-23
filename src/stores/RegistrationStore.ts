// models/SignUpModel.ts
import { types, destroy } from 'mobx-state-tree';

export const SignUpApprentiModel = types
  .model({
    nom: types.optional(types.string, ''),
    prenom: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    bio:types.optional(types.string, ''),
    domaineApprentissage:types.optional(types.string, ''),
    specialite: types.optional(types.string, ''),
    mailMaitre: types.optional(types.string, ''),
    nomMaitre: types.optional(types.string, ''),
    prenomMaitre:types.optional(types.string, ''),
    photo: types.optional(types.string, ''),
    photoName:types.optional(types.string, ''),
  })
  .actions((self) => ({
    setNom(nom: string) {
        self.nom = nom;
      },
      setPrenom(prenom: string) {
        self.prenom = prenom;
      },
      setEmail(email: string) {
        self.email = email;
      },
      setPassword(password: string) {
        self.password = password;
      },
      setBio(bio: string) {
        self.bio = bio;
      },
      setDomaineApprentissage(domaineApprentissage: string) {
        self.domaineApprentissage = domaineApprentissage;
      },
      setSpecialite(specialite: string) {
        self.specialite = specialite;
      },
      setMailMaitre(mailMaitre: string) {
        self.mailMaitre = mailMaitre;
      },
      setPhoto(photo: string) { // `photo: File` si vous stockez l'objet fichier; utilisez `photo: string` pour une URL
        self.photo = photo;
      },
      setPhotoName(photo: string) { // `photo: File` si vous stockez l'objet fichier; utilisez `photo: string` pour une URL
        self.photoName = photo;
      },
      setPrenomMaitre(photo: string) { // `photo: File` si vous stockez l'objet fichier; utilisez `photo: string` pour une URL
        self.prenomMaitre = photo;
      },
      setNomMaitre(photo: string) { // `photo: File` si vous stockez l'objet fichier; utilisez `photo: string` pour une URL
        self.nomMaitre = photo;
      },
      clear() {
        destroy(self);
      }
  }));


  export const SignUpMaitreModel = types
  .model({
    nom: types.optional(types.string, ''),
    prenom: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    idApprenti:types.optional(types.string, '')
  })
  .actions((self) => ({
    setNom(nom: string) {
        self.nom = nom;
      },
      setPrenom(prenom: string) {
        self.prenom = prenom;
      },
      setEmail(email: string) {
        self.email = email;
      },
      setPassword(password: string) {
        self.password = password;
      },
      setIdApprenti(bio: string) {
        self.idApprenti = bio;
      },
     
      clear() {
        destroy(self);
      }
  }));

export const signUpApprentiStore = SignUpApprentiModel.create({});
export const signUpMaireStore = SignUpMaitreModel.create({});
