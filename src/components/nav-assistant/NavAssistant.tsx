/**
 * Copyright 2024 Google LLC
 * Licensed under the Apache License, Version 2.0
 */
import { memo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { type Tool, SchemaType } from "@google/generative-ai";

interface FunctionCall {
  name: string;
  args?: {
    route?: string;
    productId?: string;
    fit?: string;
    size?: string;
    method?: string;
    action?: string;
    category?: string;
    isRewardsMember?: boolean;
    name?: string;
    field?: string;
    value?: string;
    phoneNumber?: string;
    code?: string;
    inseam?: string;
  };
}

const systemInstructionObject = {
  parts: [{
    text: `You are a very happy PetSmart shopping assistant.
    - When user says 'hi' or 'hello', ONLY respond with 'Hi, how can I help you today?'
    
    - When user mentions 'looking for dog food' or 'dog food', NAVIGATE to '/dog' and ONLY say 'Here are our popular dog food options'
    
    - When user mentions 'purina pro plan' or 'sensitive skin', NAVIGATE to '/product/1' and ONLY say 'Here's the Purina Pro Plan Sensitive Skin & Stomach Adult Dog Food'
    
    - When user mentions 'hills science diet' or 'sensitive stomach', NAVIGATE to '/product/2' and ONLY say 'Here's the Hill's Science Diet Sensitive Stomach & Skin Dog Food'
    
    - When user mentions 'blue buffalo' or 'life protection', NAVIGATE to '/product/3' and ONLY say 'Here's the Blue Buffalo Life Protection Formula'
    
    - When user mentions 'royal canin' or 'small breed', NAVIGATE to '/product/4' and ONLY say 'Here's the Royal Canin Small Breed Adult Dog Food'
    
    - When user mentions 'kong toy' or 'dog toy', NAVIGATE to '/personalized/3' and ONLY say 'Here's the KONG Extreme Dog Toy'
    
    - When user mentions 'nylabone' or 'chew toy', NAVIGATE to '/personalized/2' and ONLY say 'Here's the Nylabone DuraChew Toy'
    
    - When user mentions 'tennis ball' or 'fetch toy', NAVIGATE to '/personalized/3' and ONLY say 'Here's the Tennis Ball Dog Toy'
    
    - When user mentions 'rope toy' or 'tug toy', NAVIGATE to '/personalized/4' and ONLY say 'Here's the Rope Tug Dog Toy'
    
    - When user mentions 'cart' or 'checkout' or 'view cart', NAVIGATE to '/cart' and ONLY say 'Here's your shopping cart'
    
    - When user mentions 'at the store' or 'instore', NAVIGATE to '/instore' and ONLY say 'Welcome to the store, how can I help you?'
    
    - When user is in the instore page and mentions 'lab' and 'treat', ONLY say 'Here are some treat recommendations for your lab! I've highlighted where you can find them in the store.'
    
    - When rewards prompt appears, ONLY ask 'Are you a rewards member?'
    
    - When user says 'yes' to rewards, CLICK the yes button
    
    - When user says 'no' to rewards, CLICK the no button
    
    - When user is on a product page (NOT personalized) and says 'add to cart', CLICK add to cart button and ask 'Would you like to check some personalized items just for Max?'
    
    - When user is on a personalized page and says 'add to cart', ONLY CLICK add to cart button
    
    - When user says 'yes' to personalized items, NAVIGATE to '/personalized' and say 'Here are some items I picked for Max'`
  }]
};

const toolObject: Tool[] = [{
  functionDeclarations: [
    {
      name: "navigate",
      description: "Navigate to a specific page",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          route: {
            type: SchemaType.STRING,
            enum: [
              "/dog",
              "/product/1",
              "/product/2",
              "/product/3",
              "/product/4",
              "/personalized",
              "/personalized/1",
              "/personalized/2",
              "/personalized/3",
              "/personalized/4",
              "/profile",
              "/cart",
              "/instore"
            ]
          }
        },
        required: ["route"]
      }
    },
    {
      name: "addToCart",
      description: "Click add to cart button",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          action: {
            type: SchemaType.STRING,
            enum: ["click"]
          }
        },
        required: ["action"]
      }
    },
    {
      name: "respondToRewardsPrompt",
      description: "Click yes/no on rewards prompt",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          isRewardsMember: {
            type: SchemaType.BOOLEAN
          }
        },
        required: ["isRewardsMember"]
      }
    },
    {
      name: "showInstoreRecommendations",
      description: "Show recommendations in the instore page",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          action: {
            type: SchemaType.STRING,
            enum: ["show"]
          }
        },
        required: ["action"]
      }
    }
  ]
}];

const NavAssistantComponent = () => {
  const { client, setConfig, connected } = useLiveAPIContext();
  const navigate = useNavigate();

  // Set up initial config
  useEffect(() => {
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      tools: toolObject,
      systemInstruction: systemInstructionObject,
      generationConfig: {
        responseModalities: "audio",
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Aoede"
            }
          }
        }
      }
    });
  }, [setConfig]);

  // Handle rewards prompt
  useEffect(() => {
    const handleRewardsPrompt = (event: Event) => {
      if (connected && client && event.type === 'rewardsPromptFade') {
        client.send([{
          text: "Are you a rewards member?"
        }]);
      }
    };

    document.addEventListener('rewardsPromptFade', handleRewardsPrompt);
    return () => document.removeEventListener('rewardsPromptFade', handleRewardsPrompt);
  }, [client, connected]);

  // Handle tool calls
  useEffect(() => {
    if (!client) return undefined;

    const handleToolCall = (toolCall: { functionCalls: any[] }) => {
      toolCall.functionCalls.forEach(async (fCall: any) => {
        switch (fCall.name) {
          case "navigate":
            if (fCall.args?.route) {
              if (fCall.args.route.startsWith('/personalized/')) {
                // Extract the product ID
                const productId = fCall.args.route.split('/').pop();
                
                // Find and click the product card
                const productCard = document.querySelector(
                  `.product-card[data-product-id="${productId}"]`
                ) as HTMLElement;
                
                if (productCard) {
                  productCard.click();
                }
              } else {
                navigate(fCall.args.route);
              }
            }
            break;

          case "addToCart":
            const location = window.location.pathname;
            const addToCartButton = document.querySelector(
              location.includes('/personalized') 
                ? '.add-to-cart-btn'
                : '.add-to-cart-btn'
            ) as HTMLButtonElement;
            
            if (addToCartButton) {
              addToCartButton.click();
            }
            break;

          case "respondToRewardsPrompt":
            if (fCall.args?.isRewardsMember) {
              const yesButton = document.querySelector('.rewards-prompt button:first-child') as HTMLButtonElement;
              if (yesButton) {
                yesButton.click();
              }
            } else {
              const noButton = document.querySelector('.rewards-prompt button:last-child') as HTMLButtonElement;
              if (noButton) {
                noButton.click();
              }
            }
            break;
          
          case "showInstoreRecommendations":
            // Trigger the instore recommendations display
            const event = new CustomEvent('showInstoreRecommendations');
            document.dispatchEvent(event);
            break;
        }
      });
    };

    client.on("toolcall", handleToolCall);
    return () => {
      client.off("toolcall", handleToolCall);
    };
  }, [client, navigate]);

  return null;
};

export const NavAssistant = memo(NavAssistantComponent); 