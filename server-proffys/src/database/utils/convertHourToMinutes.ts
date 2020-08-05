export default function convertHourToMinutes(time: string){
    // hora e minutes 8:00

    const [hour, minutes] = time.split(':').map(Number)
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}