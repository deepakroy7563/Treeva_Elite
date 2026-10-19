import React, { createContext, useContext, useState } from 'react';
import type { Hotel } from '../types/hotel';

interface ModalContextType {
  isAddEditOpen: boolean;
  hotelToEdit: Hotel | null;
  openAddHotel: () => void;
  openEditHotel: (hotel: Hotel) => void;
  closeAddEditModal: () => void;

  isDeleteOpen: boolean;
  hotelToDelete: Hotel | null;
  openDeleteModal: (hotel: Hotel) => void;
  closeDeleteModal: () => void;

  isDetailsOpen: boolean;
  hotelForDetails: Hotel | null;
  openDetailsModal: (hotel: Hotel) => void;
  closeDetailsModal: () => void;

  globalSearch: string;
  setGlobalSearch: (term: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState<Hotel | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<Hotel | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [hotelForDetails, setHotelForDetails] = useState<Hotel | null>(null);

  const [globalSearch, setGlobalSearch] = useState('');

  const openAddHotel = () => {
    setHotelToEdit(null);
    setIsAddEditOpen(true);
  };

  const openEditHotel = (hotel: Hotel) => {
    setHotelToEdit(hotel);
    setIsAddEditOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditOpen(false);
    setHotelToEdit(null);
  };

  const openDeleteModal = (hotel: Hotel) => {
    setHotelToDelete(hotel);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setHotelToDelete(null);
  };

  const openDetailsModal = (hotel: Hotel) => {
    setHotelForDetails(hotel);
    setIsDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
    setHotelForDetails(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isAddEditOpen,
        hotelToEdit,
        openAddHotel,
        openEditHotel,
        closeAddEditModal,
        isDeleteOpen,
        hotelToDelete,
        openDeleteModal,
        closeDeleteModal,
        isDetailsOpen,
        hotelForDetails,
        openDetailsModal,
        closeDetailsModal,
        globalSearch,
        setGlobalSearch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};
