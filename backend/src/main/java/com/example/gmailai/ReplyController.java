package com.example.gmailai;

import com.example.gmailai.dto.ReplyRequest;
import com.example.gmailai.dto.ReplyResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow extension to access
public class ReplyController {

    private final AiService aiService;

    public ReplyController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/reply")
    public ReplyResponse generateReply(@RequestBody ReplyRequest request) {
        String reply = aiService.generateReply(request);
        return new ReplyResponse(reply);
    }
}
