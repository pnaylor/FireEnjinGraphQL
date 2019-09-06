export default class {
  collectionName: string;

  constructor(protected firestore: FirebaseFirestore.Firestore) {}

  async findById(id: string): Promise<any> {
    return (await this.firestore
      .doc(`${this.collectionName}/${id}`)
      .get()).data();
  }
}
