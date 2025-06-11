export interface Template {
  id: string;
  title: string;
  image: string;
}

export const templates: Template[] = [
  {
    id: "image-captioning",
    title: "Image Captioning",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: "image-classification",
    title: "Image Classification",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: "ocr",
    title: "Optical Character Recognition",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: "object-detection",
    title: "Object Detection with Bounding Boxes",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  {
    id: "semantic-segmentation",
    title: "Semantic Segmentation with Masks",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: "keypoint-labeling",
    title: "Keypoint Labeling",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  }
];
