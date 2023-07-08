import React, { useEffect, useRef } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {


  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Game constants
    const tileSize = 20;
    const gameSize = 20;
    const initialSnakeLength = 3;

    let snake = [];
    let food = { x: 0, y: 0 };
    let direction = 'right';

    // Initialize the snake and food
    const initializeGame = () => {
      // Set game size based on screen width and height
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const aspectRatio = 0.8; // Adjust this value to modify the game size relative to the screen size
    
      // Calculate game size based on screen width, height, and aspect ratio
      let gameSize = Math.min(screenWidth, screenHeight) * aspectRatio;
    
      // Limit the game size to a maximum value (e.g., 500 pixels)
      const maxGameSize = 500;
      gameSize = Math.min(gameSize, maxGameSize);
    
      // Set canvas size based on game size
      canvas.width = gameSize;
      canvas.height = gameSize;
    
      // Calculate number of rows and columns
      const numSegments = 20;
      const segmentSize = gameSize / numSegments;
    
      // Initialize game variables
      snake = [{ x: 10, y: 10 }];
      direction = 'right';
      generateFood();
    };
    
    
    

    // Generate random coordinates for the food
    const generateFood = () => {
      food = {
        x: Math.floor(Math.random() * gameSize),
        y: Math.floor(Math.random() * gameSize),
      };
    };

   // Update game state
  // Update game state
// Update game state
// Update game state
const updateGame = () => {
  // Move the snake
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y = (head.y - 1 + gameSize) % gameSize;
      break;
    case 'down':
      head.y = (head.y + 1) % gameSize;
      break;
    case 'left':
      head.x = (head.x - 1 + gameSize) % gameSize;
      break;
    case 'right':
      head.x = (head.x + 1) % gameSize;
      break;
    default:
      break;
  }
  snake.unshift(head);

  // Check if snake bites itself
  if (isSnakeCollision()) {
    clearInterval(gameInterval);
    initializeGame();
    gameInterval = setInterval(updateGame, 150);
  } else {
    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
      generateFood();
    } else {
      snake.pop();
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment) => drawSegment(segment, 'limegreen'));

    // Draw the food
    drawSegment(food, 'red');
  }
};



  


    // Check if snake collides with itself
    const isSnakeCollision = () => {
      const [head, ...body] = snake;
      return body.some((segment) => segment.x === head.x && segment.y === head.y);
    };

    // Draw a segment of the snake or food
    const drawSegment = (segment, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    };

    // Handle keydown events
    const handleKeyDown = (event) => {

      const key = event.key.toLowerCase();
      if (key.startsWith('arrow')) {
        event.preventDefault();
      }

     
      if (key === 'arrowup' && direction !== 'down') {
        direction = 'up';
      } else if (key === 'arrowdown' && direction !== 'up') {
        direction = 'down';
      } else if (key === 'arrowleft' && direction !== 'right') {
        direction = 'left';
      } else if (key === 'arrowright' && direction !== 'left') {
        direction = 'right';
      }
    };

    // Initialize the game
    initializeGame();

    // Set up event listener for keyboard controls
    document.addEventListener('keydown', handleKeyDown);

    // Start the game loop
    let gameInterval = setInterval(updateGame, 150);

    // Clean up event listener and interval on unmount
    return () => {
      clearInterval(gameInterval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="snake-game" width={400} height={400} />;
};

export default SnakeGame;
