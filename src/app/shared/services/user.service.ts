import { Injectable } from '@angular/core';
import {USERS} from '../mock-data';
import {UserI} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: UserI[] = USERS;
  constructor() { }

  getUser(userId: number): UserI {
    return this.users.find(user => user.id === userId) as UserI;
  }
}
