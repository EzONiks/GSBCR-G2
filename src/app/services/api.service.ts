import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, of, Subject} from 'rxjs';
import {tap, map} from 'rxjs/operators';


@Injectable()
export class ApiService {
  private urlApi = 'https://webserv-gr2.sio-carriat.com/gsbapi/';
  // Constructeur
  constructor(private httpClient: HttpClient) {}
  private medicaments = [];

  /**
   * Récupère tous les médicaments
   * pipe() = prend comme arguments les fonctions que vous voulez combiner, et renvoie une nouvelle fonction qui, lorsqu'elle est exécutée, exécute les fonctions composées en séquence.
   * tap() = elle prend des valeurs en entrée, les transforme et les renvoie en sortie.
   */
  getAllMedicament() {
    return this.medicaments.length ?
      of(this.medicaments) :
      this.httpClient.get<any[]>(this.urlApi + '?nomMed').pipe(tap(data => this.medicaments = data));
  }

  /**
   * Récupère le libelle d'une famille d'un médicament depuis son code
   * map() = elle prend des valeurs en entrée, les transforme et les renvoie en sortie comme pour tap et d'autre encore.
   * @param codeFamille
   */
  getFamilleOfMedicament(codeFamille: string) {
    return this.httpClient.get(this.urlApi + '?idFam=' + codeFamille).pipe(map((res: any) => res));
  }

  /**
   * Sauvegarde les modifications des informations d'un médicament
   * @param idMed
   * @param composition
   * @param effets
   * @param contreIndications
   */
  saveMedicament(idMed, composition, effets, contreIndications) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(this.urlApi + '?idMed2=' + idMed + '&composition=' + composition + '&effets=' + effets + '&contreIndications=' + contreIndications).pipe(map((res: any) => res));
  }

}
