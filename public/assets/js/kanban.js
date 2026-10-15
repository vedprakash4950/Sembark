/* =========================================================
   KANBAN.JS
   Lightweight native HTML5 drag-and-drop for the Kanban
   board on pages/components.html. No external dependency.
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const board = document.querySelector('.kanban-board');
    if (!board) return;

    let dragCard = null;

    board.addEventListener('dragstart', function (e) {
      if (e.target.classList.contains('kanban-card')) {
        dragCard = e.target;
        setTimeout(function () { dragCard.classList.add('dragging'); }, 0);
      }
    });

    board.addEventListener('dragend', function (e) {
      if (e.target.classList.contains('kanban-card')) {
        e.target.classList.remove('dragging');
        dragCard = null;
      }
      board.querySelectorAll('.kanban-column').forEach(function (col) { col.classList.remove('drag-over'); });
    });

    board.querySelectorAll('.kanban-cards').forEach(function (list) {
      list.addEventListener('dragover', function (e) {
        e.preventDefault();
        const column = list.closest('.kanban-column');
        column.classList.add('drag-over');
        const afterEl = getDragAfterElement(list, e.clientY);
        if (!dragCard) return;
        if (afterEl == null) {
          list.appendChild(dragCard);
        } else {
          list.insertBefore(dragCard, afterEl);
        }
      });
      list.addEventListener('dragleave', function () {
        list.closest('.kanban-column').classList.remove('drag-over');
      });
    });

    function getDragAfterElement(container, y) {
      const cards = [...container.querySelectorAll('.kanban-card:not(.dragging)')];
      return cards.reduce(function (closest, card) {
        const box = card.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: card };
        }
        return closest;
      }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
    }

    // Update column counters whenever a drop happens
    board.addEventListener('drop', updateCounters);
    board.addEventListener('dragend', updateCounters);
    function updateCounters() {
      board.querySelectorAll('.kanban-column').forEach(function (col) {
        const count = col.querySelectorAll('.kanban-card').length;
        const badge = col.querySelector('.kanban-count');
        if (badge) badge.textContent = count;
      });
    }
  });
})();
