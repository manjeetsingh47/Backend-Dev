const softDelete = async (Model, id) => {

    return await Model.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

};

export default softDelete;