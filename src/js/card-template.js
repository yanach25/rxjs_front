import prepareDate from './prepare-date';

const cardTemplate = (card) => {
  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('p-2');
  div.innerHTML = `<div class="row mb-2">
    <div class="col-2"><img src="${card.avatar}" alt="Avatar" class="avatar"></div>
    <div class="col">
      <div class="row">
        <div class="col">${card.author}</div>
      </div>
      <div class="row">
        <div class="col">${prepareDate(card.created)}</div>
      </div>
    </div>
  </div>
  <img src="${card.image}" class="card-img-top" alt="...">
  <div class="card-body comment" data-comments="${card.id}>
    <h5 class="card-title">Latest comments</h5>
  </div>
  `;

  if (card.comments.length) {
    const commentContainer = div.querySelector('.comment');
    const { comments } = card;
    comments.forEach((comment) => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('row');
      commentDiv.innerHTML = `
      <div class="col-2"><img src="${comment.avatar}" alt="Avatar" class="avatar comment"></div>
  <div class="col">
    <div class="row">
      <div class="col">${comment.author}</div>
      <div class="col">${prepareDate(comment.created)}</div>
    </div>
    <div class="row">
      <div class="col">
      ${comment.content}
      </div>
    </div>
  </div>`;
      commentContainer.appendChild(commentDiv);
    });
  }

  return div;
};

export default cardTemplate;
