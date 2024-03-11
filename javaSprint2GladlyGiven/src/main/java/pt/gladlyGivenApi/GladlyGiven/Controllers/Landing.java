package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/hello")
public class Landing {
    @GetMapping
    public String GetHello() {
        System.out.println("Hello was reached!");
        return "Hello from API";
    }
}
