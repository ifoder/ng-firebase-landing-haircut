import { Injectable, inject, signal } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Translation, TranslationData } from '../models/translations.model';

@Injectable({ providedIn: 'root' })
export class TranslationsService {
  private firestore = inject(Firestore);
  translationsCollection = collection(this.firestore, 'translations');

  translationsDataSig = signal<TranslationData[]>([]);

  // add(data: TranslationData) {
  //   const translation: Translation = { [data.key]: data.value };
  //   return this.db.setDocument('translations', data.lang, translation);
  // }

  getAll(lang?: string): Observable<TranslationData[]> {
    return collectionData(this.translationsCollection, {
      idField: 'id',
    }).pipe(
      map((translations: TranslationData[]) => {
        //console.log(translations);
        const allTranslations: any = [];
        translations.forEach((translations: TranslationData) => {
          console.log(translations);
          if (!allTranslations[translations.lang])
            allTranslations[translations.lang] = [];

          allTranslations[translations.lang] = {
            ...allTranslations[translations.lang],
            [translations.key]: translations.value,
          };
        });
        return allTranslations;
      })
    ) as Observable<TranslationData[]>;
  }

  // getAll() {
  //   return this.db.getCollection('translations').pipe(
  //     map((translations: Translation[]) => {
  //       //console.log(translations);
  //       const allTranslations: TranslationData[] = [];
  //       translations.forEach((translation: Translation) => {
  //         //console.log(translation);
  //         const lang = translation.id;
  //         const keys = Object.keys(translation).filter(
  //           (key: string) => key !== 'id'
  //         );
  //         keys.forEach((key: string) => {
  //           allTranslations.push({
  //             key: key,
  //             value: translation[key],
  //             lang: lang,
  //           });
  //         });
  //       });
  //       return allTranslations;
  //     })
  //   );
  // }

  // getWhere(
  //   field: string,
  //   operator: firebase.firestore.WhereFilterOp,
  //   value: string
  // ) {
  //   return this.getWhereFn((ref) => ref.where(field, operator, value));
  // }

  // getWhereFn(queryFn: QueryFn) {
  //   return this.db.getCollection('translations', queryFn);
  // }

  // edit(data: TranslationData) {
  //   return this.add(data);
  // }

  // delete(key: string, lang: string) {
  //   return new Promise(async (resolve, reject) => {
  //     const translations: Translation = await this.get(lang)
  //       .pipe(take(1))
  //       .toPromise();
  //     if (translations[key]) {
  //       delete translations[key];
  //       this.db
  //         .setDocument('translations', lang, translations, false)
  //         .then(() => {
  //           resolve();
  //         })
  //         .catch((error: Error) => {
  //           reject(error);
  //         });
  //     } else {
  //       resolve();
  //     }
  //   });
  // }

  // keyExists(key: string, lang: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     this.db
  //       .getDocumentRef('translations', lang)
  //       .get()
  //       .toPromise()
  //       .then((doc) => {
  //         const translations = doc.data();
  //         if (translations && translations[key]) {
  //           resolve(true);
  //         } else {
  //           resolve(false);
  //         }
  //       })
  //       .catch((error: Error) => {
  //         console.log(error);
  //         resolve(false);
  //       });
  //   });
  // }

  // // async countAll() {
  // //   const translations = await this.getAll().pipe(take(1)).toPromise();
  // //   return translations ? translations.length : 0;
  // // }

  // // async countWhereFn(queryFn: QueryFn) {
  // //   const translations = await this.getWhereFn(queryFn).pipe(take(1)).toPromise();
  // //   return translations ? translations.length : 0;
  // // }

  // // countWhere(field: string, operator: firebase.firestore.WhereFilterOp, value: string) {
  // //   return this.countWhereFn(ref => ref.where(field, operator, value));
  // // }

  // private count(docs: DocumentData[]) {
  //   let count = 0;
  //   docs.forEach((doc: DocumentData) => {
  //     count += Object.keys(doc.data()).length;
  //   });
  //   return count;
  // }

  // async countAll() {
  //   const docs = await this.db.getDocumentsDataAsPromise('translations');
  //   return this.count(docs);
  // }

  // async countWhereFn(queryFn: QueryFn) {
  //   const docs = await this.db.getDocumentsDataAsPromise(
  //     'translations',
  //     queryFn
  //   );
  //   return this.count(docs);
  // }

  // countWhere(
  //   field: string,
  //   operator: firebase.firestore.WhereFilterOp,
  //   value: string
  // ) {
  //   return this.countWhereFn((ref) => ref.where(field, operator, value));
  // }
}
