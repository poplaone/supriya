import React from 'react';
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "../components/ui/image-comparison";

const ImageComparisonDemo = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Image Comparison Demo</h1>
      <div className="max-w-4xl mx-auto">
        <ImageComparison className="aspect-video w-full rounded-lg" enableHover>
          <ImageComparisonImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            className="grayscale"
            alt="Before Image"
            position="left"
          />
          <ImageComparisonImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="After Image"
            position="right"
          />
          <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs">
            <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
          </ImageComparisonSlider>
        </ImageComparison>
      </div>
    </div>
  );
};

export default ImageComparisonDemo;