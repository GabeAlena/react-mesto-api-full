const Card = require('../models/card');

const ValidationError = require('../errors/ValidationError');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

/* возвращает все карточки */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({
      _id: cards._id,
      link: cards.link,
      name: cards.name,
      owner: cards.owner,
      likes: cards.likes,
    }))
    /* {

    } */
    .catch((err) => next(err));
};

/* создает карточку */
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(`Данные некорректны ${err.message}`));
      }
      return next(err);
    })
    .catch(next);
};

/* удаляет карточку по идентификатору */
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Запрашиваемая карточка не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Запрещено удалять чужие карточки!');
      } else {
        card.remove();
      }
    })
    .then(() => res.send({ message: 'Карточка успешно удалена' }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Данные некорректны ${err.message}`));
        return;
      }
      next(err);
    });
};

/* поставить лайк карточке */
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Запрашиваемая карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Данные некорректны ${err.message}`));
        return;
      }
      next(err);
    });
};

/* убрать лайк с карточки */
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Запрашиваемая карточка не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Данные некорректны ${err.message}`));
        return;
      }
      next(err);
    });
};
