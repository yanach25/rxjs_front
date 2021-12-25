import 'bootstrap/dist/css/bootstrap.min.css';
import {
  forkJoin, map, of, switchMap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import cardTemplate from './card-template';

const app = document.querySelector('#app');
ajax('https://ahj-http-yanach.herokuapp.com/posts/latest').pipe(
  map((data) => data.response),
  map((response) => (response.status === 'ok' ? response.data : of([]))),
  switchMap((cards) => forkJoin(cards.map((card) => ajax(`https://ahj-http-yanach.herokuapp.com/posts/${card.id}`).pipe(
    map((comments) => comments.response),
    map((comments) => {
      card.comments = comments.status === 'ok' ? comments.data : [];

      return card;
    }),
  )))),
).subscribe((cards) => {
  cards.forEach((card) => {
    const cardTmpl = cardTemplate(card);
    app.appendChild(cardTmpl);
  });
});
