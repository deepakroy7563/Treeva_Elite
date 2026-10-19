import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastContainer } from '../ui/Toast';
import { AddEditHotelModal } from '../hotels/AddEditHotelModal';
import { DeleteConfirmModal } from '../hotels/DeleteConfirmModal';
import { HotelDetailsModal } from '../hotels/HotelDetailsModal';
import { useModals } from '../../context/ModalContext';
import { useHotels } from '../../context/HotelContext';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    isAddEditOpen,
    hotelToEdit,
    openAddHotel,
    openEditHotel,
    closeAddEditModal,
    isDeleteOpen,
    hotelToDelete,
    closeDeleteModal,
    isDetailsOpen,
    hotelForDetails,
    closeDetailsModal,
    globalSearch,
    setGlobalSearch,
  } = useModals();

  const { deleteHotel } = useHotels();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!hotelToDelete) return;
    setIsDeleting(true);
    try {
      await deleteHotel(hotelToDelete.id);
      closeDeleteModal();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onOpenAddModal={openAddHotel}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          searchTerm={globalSearch}
          onSearchChange={setGlobalSearch}
          onOpenAddModal={openAddHotel}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Global Modals */}
      <AddEditHotelModal
        isOpen={isAddEditOpen}
        onClose={closeAddEditModal}
        hotelToEdit={hotelToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        hotel={hotelToDelete}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <HotelDetailsModal
        isOpen={isDetailsOpen}
        hotel={hotelForDetails}
        onClose={closeDetailsModal}
        onEdit={(hotel) => openEditHotel(hotel)}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
