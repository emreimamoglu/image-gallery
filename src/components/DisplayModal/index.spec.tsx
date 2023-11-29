import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplayModal from '../DisplayModal';
import { Image } from '../../types';

describe('DisplayModal Component', () => {
  const mockHandleClose = vi.fn();
  const mockImage = {
    largeImageURL: 'http://example.com/image.jpg',
    tags: 'nature, forest'
  } as unknown as Image;

  it('renders correctly when open', () => {
    render(<DisplayModal open={true} handleClose={mockHandleClose} image={mockImage} />);
    expect(screen.getByAltText(mockImage.tags)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<DisplayModal open={false} handleClose={mockHandleClose} image={mockImage} />);
    expect(screen.queryByAltText(mockImage.tags)).toBeNull();
  });

  it('displays the correct image', () => {
    render(<DisplayModal open={true} handleClose={mockHandleClose} image={mockImage} />);
    const image = screen.getByAltText(mockImage.tags);
    expect(image).toHaveAttribute('src', mockImage.largeImageURL);
    expect(image).toHaveAttribute('alt', mockImage.tags);
  });
});
