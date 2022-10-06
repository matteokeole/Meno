import { Share } from "@capacitor/share";
import { Device } from "@capacitor/device";

/**
 * Shares the note with other users.
 * This uses the Capacitor Share API (and the Capacitor Device API for message additional infos).
 *
 * @async
 */
export const share = async (note) => {
  const { model } = await Device.getInfo(),
    percent = (await Device.getBatteryInfo()).batteryLevel * 100;
  await Share.share({
    title: note.title,
    text: `${note.content} depuis mon ${model} chargé à ${percent}%`,
  });
};

export const toggleFavorite = (note) => {
  note.isFavorite = !note.isFavorite;
};
