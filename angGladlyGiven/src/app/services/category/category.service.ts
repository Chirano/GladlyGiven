import { Injectable } from '@angular/core';
import { SessionContext } from '../../classes/authentication/SessionContext';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../../classes/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dotNet = 'https://localhost:7280';

  userId: number | null = null;
  sessionContext: SessionContext | null = AuthService.SessionContext;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  /* POST: add a new Service request to the database */
  registerNewCategory(category: Category): Observable<Category> {
    const newCategory: Category = {
      id : category.id,
      name : category.name,

    };
    console.log(newCategory);
    
    return this.http.post<any>(
      this.dotNet + "/category",
      newCategory, this.httpOptions
    );
  }
  /* GET : */
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.dotNet + "/categories");
  }
}
