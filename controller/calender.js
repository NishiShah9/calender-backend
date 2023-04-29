const { MESSAGE } = require("../constant");
const Calender = require("../model/calender");

module.exports = {
  /* Add calender event */
  async create(req, res) {
    try {
      let params = req.body;
      if (!params.title && !params.date) {
        // title & date is Required
        return res
          .status(400)
          .json({ status: false, Message: MESSAGE.CALENDER_TITLE_DATE });
      }
      let result = {
        title: params.title,
        fullDate: params.date,
        month: new Date(params.date).getMonth() + 1,
        year: new Date(params.date).getFullYear(),
        date: new Date(params.date).getDate(),
      };
      let calender = await Calender.create(result); // save the data in DB
      return res.status(200).json({
        success: true,
        result: calender,
        message: MESSAGE.CALENDER_CREATE,
      });
    } catch (error) {
      // if error then display error
      return res
        .status(500)
        .json({ success: false, message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
  },

  /* get All calenders based on filters */
  async findAll(req, res) {
    let params = req.query;
    let query = {}; // done filter based on year month and date
    if (params.year) {
      query.year = params.year;
    }
    if (params.month) {
      query.month = params.month;
    }
    if (params.date) {
      query.date = params.date;
    }

    try {
      let calender = await Calender.find(query); // find data based on filter in DB
      return res.status(200).json({
        success: true,
        result: calender,
        message: MESSAGE.CALENDER_FETCH,
        count: calender.length,
      });
    } catch (error) {
      // if error then display error
      return res
        .status(500)
        .json({ success: false, message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
  },

  /* get calender by Id */
  async findById(req, res) {
    try {
      let params = req.body;
      let calender = await Calender.find({ id: params.id });
      return res.status(200).json({
        success: true,
        result: calender,
        message: MESSAGE.CALENDER_FETCH,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
  },

  /* delete calender event by ID */
  async delete(req, res) {
    try {
      let { id } = req.params;
      let calender = await Calender.findByIdAndDelete({ _id: id });
      if (calender?._id) {
        return res.status(200).json({
          success: true,
          message: MESSAGE.CALENDER_DELETE,
        });
      } else { // if id not found or failed to delete
        return res.status(400).json({
          success: false,
          message: MESSAGE.CALENDER_NOT_FOUND,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
  },

  /* update calender event by ID */
  async update(req, res) {
    try {
      let { id } = req.params;
      let params = req.body;
      let calender = await Calender.findByIdAndUpdate({ _id: id }, params);
      if (calender?._id) {
        return res.status(200).json({
          success: true,
          message: MESSAGE.CALENDER_UPDATE,
        });
      } else { // if id not found or failed to update
        return res.status(400).json({
          success: false,
          result: null,
          message: MESSAGE.CALENDER_NOT_FOUND,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
  },
};
