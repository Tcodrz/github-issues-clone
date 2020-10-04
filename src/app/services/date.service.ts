import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  getFullDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    const fullDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return fullDate;
  }

  calculateUpdatedAt(updatedAt: string): {type: string, amount: number} {
    const currentDate = Date.now();
    const date = currentDate - Date.parse(updatedAt);
    const minutes = Math.floor(date / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const month = Math.floor(days / 30);
    const years = Math.floor(month / 12);

    if (years > 0) {
      return { type: `${years < 2 ? 'year' : 'years'}`, amount: years};
    }else if (month > 0) {
      return { type: `${month < 2 ? 'month' : 'months'}`, amount: month };
    } else if (weeks > 0) {
      return { type: `${weeks < 2 ? 'week' : 'weeks'}`, amount: weeks};
    } else if (days > 0) {
      return { type: `${days < 2 ? 'day' : 'days'}`, amount: days };
    } else if (hours > 0) {
      return { type: `${hours < 2 ? 'hour' : 'hours'}`, amount: hours };
    } else if (minutes > 0) {
      return { type: `${minutes < 2 ? 'minute' : 'minutes'}`, amount: minutes };
    }
    return { type: 'now', amount: null };

  }
}
