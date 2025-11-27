package com.example.gmailai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService implements AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient;

    public GeminiService(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public String generateReply(String emailContent) {
        String prompt = "Draft a professional and concise reply to the following email, dont add subject in reply, reply should be of human format:\n\n" + emailContent +" now u have content only return me the email nothing else no explaination just the email.";
        
        // Using Gemini 2.5 Flash as it is available for this key.
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            )
        );

        try {
            Map response = restClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            if (response == null) return "Error: No response from Gemini.";

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (candidates == null || candidates.isEmpty()) return "Error: No candidates returned.";

            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");

        } catch (Exception e) {
            return "Error generating reply from Gemini: " + e.getMessage();
        }
    }
}
