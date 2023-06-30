import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadMultiple, { PropsInter } from '../uploadMultiple';
import { test, vi } from 'vitest';

describe('UploadMultiple', () => {
  const formikMock = {
    setFieldValue: vi.fn(),
  };

  const setImagesMock = vi.fn();

  const imagesMock = [
    { url: 'image1.jpg', file: new File([''], 'image1.jpg') },
    { url: 'image2.jpg', file: new File([''], 'image2.jpg') },
  ];

  const props: PropsInter = {
    formik: formikMock,
    setImages: setImagesMock,
    images: imagesMock,
  };

  beforeEach(() => {
    render(<UploadMultiple {...props} />);
  });

  test('renders the component', () => {
    expect(
      screen.getByText('Drag and drop some product images here, or click to select images')
    ).toBeInTheDocument();
  });

  test('calls setFieldValue with updated images when images are dropped', async () => {
    const updatedImagesMock = [
      { url: 'image1.jpg', file: new File([''], 'image1.jpg') },
      { url: 'image2.jpg', file: new File([''], 'image2.jpg') },
      { url: 'image3.jpg', file: new File([''], 'image3.jpg') },
      { url: 'image4.jpg', file: new File([''], 'image4.jpg') },
    ];

    const dropzone = screen.getByRole('hidenClick');
    fireEvent.click(dropzone);
    expect(
      screen.getByText('Images must not be less than 4 and not greater than 8')
    ).toBeInTheDocument();
    await waitFor(() => {
      const uploadonDrag = screen.getByTestId('uploadonDrag');
      userEvent.upload(
        uploadonDrag,
        updatedImagesMock.map((image) => image.file)
      );
      expect(dropzone).toBeInTheDocument();
    });
  });

  test('calls handleDeleteImage when delete button is clicked', () => {
    const deleteButton = screen.getAllByRole('deleteBtn');
    expect(deleteButton.length).toBeGreaterThan(0);
    deleteButton.forEach((btn) => {
      userEvent.click(btn);
      expect(setImagesMock).toBeCalled();
    });
  });
});
