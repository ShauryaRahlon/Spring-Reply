package com.example.gmailai.dto;

public class ReplyRequest {
    private String content;
    private String type; // "EMAIL" or "PR_REVIEW"

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
