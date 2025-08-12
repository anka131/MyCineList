import express from 'express';
import { authMiddleware, checkTokenExpiry} from '../authMiddleware.js';
import { User } from '../models/userSchema.js';

const router = express.Router();
router.use(authMiddleware);
router.use(checkTokenExpiry);

router.get('/', async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("savedMovies");
            if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.savedMovies); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Error fetching favorites'});
        }
});

router.post('/', async (req, res) => {
   try {
    const { imdbID, title, poster, imdbRating, userRating, runtime } = req.body;

    // Validate required fields
    if (!imdbID || !title) {
      return res.status(400).json({ message: "imdbID and title are required" });
    }

    const user = await User.findById(req.user.id);
    
    // Create full movie object
    const movieToAdd = {
      imdbID,
      title,
      poster: poster || null,
      ...(imdbRating && { imdbRating: Number(imdbRating) }),
      ...(userRating && { userRating: Number(userRating) }),
      ...(runtime && { runtime: Number(runtime) })
    };

    // Check for duplicates
    const exists = user.savedMovies.some(m => m.imdbID === imdbID);
    if (exists) return res.status(400).json({ message: "Movie already saved" });

    user.savedMovies.push(movieToAdd);
    await user.save();
    
    res.status(201).json(user.savedMovies);
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).json({ message: "Server error" });
  }
});



router.delete('/:imdbID', async (req, res) => {
 try {
    const { imdbID } = req.params;
    
    // Validate ID format
    if (!imdbID || !/^tt\d+$/.test(imdbID)) {
      return res.status(400).json({ message: "Invalid IMDB ID format" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { savedMovies: { imdbID } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedMovies);
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res.status(500).json({ message: "Error deleting favorite" });
  }
});
export default router;