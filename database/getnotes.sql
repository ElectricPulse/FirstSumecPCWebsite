SELECT notes.*, JSON_ARRAYAGG(notes_images.filename)
FROM notes
INNER JOIN notes_images
ON notes.id = notes_images.notes_id
GROUP BY notes.id

