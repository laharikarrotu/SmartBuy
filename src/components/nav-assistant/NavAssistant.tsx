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
    text: `You are a very happy smartbuy shopping assistant. Help users navigate the store and find products naturally.

    Navigation Instructions:
    - Respond to greetings like 'hi', 'hello', 'hey' with 'Hi, how can I help you today?'
    
    - For electronics related queries:
      - For general electronics ('electronics', 'shop electronics'): NAVIGATE to '/tv' and say 'Here are our electronics categories'
      - For TVs ('TVs', 'television', 'home theater'): NAVIGATE to '/tv' and say 'Here are our TV and home theater options'
      - For computers ('computers', 'laptops', 'tablets'): NAVIGATE to '/computers-tablets' and say 'Check out our computer and tablet selection'
      - For phones ('phones', 'smartphones', 'cell phones'): NAVIGATE to '/cell-phones' and say 'Here are our latest smartphones and accessories'
      - For gaming ('gaming', 'video games', 'consoles'): NAVIGATE to '/gaming' and say 'Browse our gaming collection'
      - For cameras ('cameras', 'photography'): NAVIGATE to '/cameras' and say 'Explore our camera selection'
      - For smart home ('smart home', 'automation'): NAVIGATE to '/smart-home' and say 'Discover our smart home solutions'
    
    - For dog food related queries (e.g. 'need dog food', 'looking for pet food', 'dog food options'):
      NAVIGATE to '/dog' and say 'Here are our popular dog food options'
    
    - For specific dog food brands:
      - Purina related ('purina', 'pro plan', 'sensitive skin'): NAVIGATE to '/product/1'
      - Hill's related ('hills', 'science diet', 'sensitive stomach'): NAVIGATE to '/product/2'
      - Blue Buffalo related ('blue buffalo', 'life protection'): NAVIGATE to '/product/3'
      - Royal Canin related ('royal canin', 'small breed'): NAVIGATE to '/product/4'
    
    - For dog toys:
      - Kong related ('kong', 'tough toy', 'durable toy'): NAVIGATE to '/personalized/3'
      - Nylabone related ('nylabone', 'chew toy'): NAVIGATE to '/personalized/2'
      - Ball related ('tennis ball', 'fetch toy', 'ball'): NAVIGATE to '/personalized/3'
      - Rope related ('rope toy', 'tug toy', 'pull toy'): NAVIGATE to '/personalized/4'
    
    - For shopping cart related ('cart', 'checkout', 'view cart', 'my cart', 'shopping cart'):
      NAVIGATE to '/cart' and say 'Here's your shopping cart'
    
    - For in-store queries ('store', 'at the store', 'in store', 'instore', 'store location'):
      NAVIGATE to '/instore' and say 'Welcome to the store, how can I help you?'
    
    - When in the instore page and user mentions treats for specific breeds:
      ONLY say 'Here are some treat recommendations! I've highlighted where you can find them in the store.'
    
    - For rewards related:
      - When rewards prompt appears: ONLY ask 'Are you a rewards member?'
      - When user confirms ('yes', 'yeah', 'yep'): CLICK the yes button
      - When user denies ('no', 'nope', 'not yet'): CLICK the no button
    
    - For cart actions:
      - When on product page and user wants to add to cart ('add to cart', 'buy this', 'purchase'):
        CLICK add to cart button and ask 'Would you like to check some personalized items just for Max?'
      - When on personalized page and user wants to add to cart:
        ONLY CLICK add to cart button
    
    - When user wants personalized items ('yes', 'show me', 'personalized'):
      NAVIGATE to '/personalized' and say 'Here are some items I picked for Max'`
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
              "/tv",
              "/computers-tablets",
              "/cell-phones",
              "/gaming",
              "/cameras",
              "/smart-home",
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