import java.util.Date;

public class Clock {
    private String day;
    private String month;
    private String year;
    private String hours;
    private String minutes;
    private String seconds;

    private void updateTime(){
    //Fri Dec 20 22:11:59 MSK 2019
        String fullDate = new Date().toString();
        String[] strings = fullDate.split(" ");

    }


    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
