import {Share} from "@capacitor/share";
import {Device} from "@capacitor/device";
import {Note} from "./note.service";

/**
 * Shares the note with other users.
 * This uses the Capacitor Share API (and the Capacitor Device API for message additional infos).
 *
 * @async
 * @param {Note} note
 */
export async function share(note: Note) {
  const
    {model} = await Device.getInfo(),
    percent = (await Device.getBatteryInfo()).batteryLevel * 100;

  await Share.share({
    title: note.title,
    text: `${note.content} depuis mon ${model} chargé à ${percent}%`,
  });
};

/**
 * Toggles the note favorite status.
 * 
 * @param {Note} note
 */
export function toggleFavorite(note: Note) {
  note.isFavorite = !note.isFavorite;
};