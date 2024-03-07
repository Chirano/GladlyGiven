// Author: Tiago Barracha
// ti.barracha@gmail.com

package pt.gladlyGivenApi.GladlyGiven;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Class responsible for handling DateTime operations
 */
public class DateTimeUtils {
    public static final String dateStringFormat = "yyyy-MM-dd HH:mm:ss";

    public static String getDateTimeNowAsString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat(DateTimeUtils.dateStringFormat);
        return dateFormat.format(new Date());
    }

    public static Date getDateFromString(String dateString) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat(dateStringFormat);
        try {
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            System.out.println(String.format("Date string: '%s' is in the wrong format: '%s'", dateString, dateStringFormat));
            return new Date();
        }
    }

    public static Date getDateTimeNow() {
        return new Date();
    }
}
