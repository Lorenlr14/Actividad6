import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  arrUsers: User[] = [];
  private initialUrl: string = "https://peticiones.online/api/users/";
  constructor(private httpClient: HttpClient) { }

  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.initialUrl));
  }
  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.initialUrl}${pId}`));
  }
  create(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.post<User>(this.initialUrl, pUser));
  }
  update(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>(`${this.initialUrl}${pUser.id}`, pUser));
  }
  delete(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.initialUrl}${pId}`));
  }
}
