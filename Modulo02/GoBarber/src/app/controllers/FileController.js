import FileModel from '../models/FileModel';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await FileModel.create({
      name,
      path,
    });
    return res.json(file);
  }
}

export default new FileController();
