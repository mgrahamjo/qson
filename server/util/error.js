module.exports = (res, error = 'Something went wrong.', status = 500) => {

    console.error(error);

    res.status(status).json({error});

};
