import {
  getSingers,
  getSingerById,
  createSinger,
  updateSinger,
  deleteSinger,
} from "@/services/singerServices";

export default async function handler(req, res) {
  switch (method) {
    case "GET":
      if (id) {
        try {
          const singer = await getSingerById(id);
          res.status(200).json(singer);
        } catch (error) {
          res.status(404).json({ message: "Cantante no encontrado" });
        }
      } else {
        const singers = await getSingers();
        res.status(200).json(singers);
      }
      break;
    case "POST":
      try {
        const newSinger = await createSinger(req.body);
        res.status(201).json(newSinger);
      } catch (error) {
        res.status(400).json({ message: "Petición inválida" });
      }
      break;
    case "PUT":
      try {
        const updatedSinger = await updateSinger(id, req.body);
        res.status(200).json(updatedSinger);
      } catch (error) {
        res.status(400).json({ message: "Petición inválida" });
      }
      break;
    case "DELETE":
      try {
        await deleteSinger(id);
        res.status(200).json({ message: "Cantante eliminado exitosamente" });
      } catch (error) {
        res.status(404).json({ message: "Cantante no encontrado" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
