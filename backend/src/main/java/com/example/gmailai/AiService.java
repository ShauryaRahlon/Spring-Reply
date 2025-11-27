package com.example.gmailai;

import com.example.gmailai.dto.ReplyRequest;

public interface AiService {
    String generateReply(ReplyRequest request);
}
