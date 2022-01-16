
import {throwError as observableThrowError, Observable} from 'rxjs';
import {HttpHeaders, HttpResponse} from "@angular/common/http";


export class HttpUtils {

  static apiDefaultHeaders = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});
  static apiDefaultOptions = { headers: HttpUtils.apiDefaultHeaders };

  static extractBody(response: HttpResponse<any>) {
    return response.body || response || '';
  }

  static extractBodyData(response: HttpResponse<any>) {
    let body = this.extractBody(response);
    return body.data || { };
  }

  static convertHttpErrorResponseToApiError (errorResponse: HttpResponse<any> | any): any {
    let apiError: any;
    if (errorResponse instanceof HttpResponse) {
      // Cas d'une réponse HTTP correctement formatée (cas normal) :
      // - extraction du corps de la requête et cast en objet ApiError
      try {
        apiError = HttpUtils.extractBody(errorResponse) as any;
      } catch (e) {
        // Si le body n'est pas du JSON l'extract ci-dessus ne fonctionne pas et on récupère le body "brut"...
        apiError = new Error();
        apiError.message = errorResponse.body.toString();
        // Surcharge avec status et statusText de la Réponse HTTP native...
        apiError.status = errorResponse.status;
        apiError.error = errorResponse.statusText;
      }
    } else {
      // Cas d'une réponse dans n'importe quel format (cas non attendu)
      // - tentative d'extraction d'un message...
      apiError = new Error();
      apiError.message = errorResponse.message ? errorResponse.message : errorResponse.toString();
    }
    return apiError;
  }


  static toApiErrorObservable(errorResponse: HttpResponse<any>): Observable<any> {
    // Cas non géré ci-dessus : on laisse passer l'erreur, après conversion en ApiError
    return observableThrowError(HttpUtils.convertHttpErrorResponseToApiError(errorResponse));
  }

}
