package pt.gladlyGivenApi.GladlyGiven.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/hello")
public class Landing {
    @GetMapping
    public ResponseEntity<String> GetHello() {
        System.out.println("Hello was reached!");
        return ResponseEntity.ok("Hello from API"); // will return an error in Angular because it is not in a JSON format
    }
}
