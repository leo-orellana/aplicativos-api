/**
 * @function skipFeathersInternalCall
 * @summary Given a context checks wheter the call is a request or a feathers
 * intenal call.
 * @param {Object} context A before hook context.
 * @returns {Object} A before hook context.
 */
const skipFeathersInternalCall = (context) => {
  if(!context.params.provider) {
    return context;
  }
};

function projectAuthors(context) {
  context.params.query = {
    $populate: 'author'
  };
  return context;
}

function filterData(context) {
  skipFeathersInternalCall(context);
  const orders = context.result.map((order) => {
    return {
      _id: order._id,
      isActive: order.isActive,
      author: {
        _id: order.author._id,
        username: order.author.username
      }
    };
  });
  context.params.query = {};
  context.result = orders;
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [
      projectAuthors
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
    ],
    find: [
      filterData
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
