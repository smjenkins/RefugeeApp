/*
    This takes a model and exposes functions that map to
    database specific methods
 */

exports.buildORMFromModel = Model => {
  const save = async data => new Model(data).save();

  const findOneAndUpdate = async (condition, data) =>
    Model.findOneAndUpdate(condition, data, { new: true });

  const findOneAndRemove = async condition => Model.findOneAndRemove(condition);

  const findById = async id => Model.findById(id);

  const findByIdAndUpdate = async (id, data) => Model.findByIdAndUpdate(id, data, { new: true });

  const find = async condition => Model.find(condition).sort({ updatedAt: -1 });

  const count = async condition => Model.find(condition).countDocuments();

  const findOne = async condition => Model.findOne(condition);

  return {
    save,
    find,
    findById,
    findByIdAndUpdate,
    findOne,
    findOneAndUpdate,
    findOneAndRemove,
    count,
  };
};

