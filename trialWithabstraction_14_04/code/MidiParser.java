import com.cycling74.max.*; // API MAX/MSP java initialization
import javax.sound.midi.*; // library for MIDI parsing
import java.io.File; // file access

public class MidiParser extends MaxObject { //create an object in Java for Max

    public MidiParser() { //downloads a class and initialize an object
        declareOutlets(new int[]{ DataTypes.INT, DataTypes.INT }); // two outlets for object type INT
        setOutletAssist(0, "numerator");
        setOutletAssist(1, "denominator");
		post("MidiParser loaded v.30_3_2026"); //approval of download
    }

    public void read(String path) { //method like a function in JS
        try {
            File file = new File(path);

            Sequence sequence = MidiSystem.getSequence(file); //the whole Midi file
            Track[] tracks = sequence.getTracks(); //tracks into the file

            for (Track track : tracks) {
                for (int i = 0; i < track.size(); i++) {
                    MidiEvent event = track.get(i); //get a MIDIEvent with index
                    MidiMessage message = event.getMessage(); //get a MidiMessage

                    if (message instanceof MetaMessage) { //looking for MetaMessage
                        MetaMessage meta = (MetaMessage) message; //access to data in this MetaMessage
                        if (meta.getType() == 0x58) { //if it is a MetaMessage with this code it is a Time signature
                            byte[] data = meta.getData(); //get the data of Time Signature

                            int numerator = data[0] & 0xFF;
                            int denominator = (int) Math.pow(2, data[1] & 0xFF); //positive value with x squared

                            outlet(0, numerator); //send to outlets
                            outlet(1, denominator);
                            return;
                        }
                    }
                }
            }

            post("No time signature found in MIDI file.");

        } catch (Exception e) {
            error("Error: " + e.getMessage());
        }
    }
}
