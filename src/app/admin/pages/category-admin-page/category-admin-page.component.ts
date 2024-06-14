import { Component } from '@angular/core';

@Component({
  selector: 'app-category-admin-page',
  templateUrl: './category-admin-page.component.html',
  styleUrls: ['./category-admin-page.component.scss']
})
export class CategoryAdminPageComponent {
  categories = [
    { id: 1, name: 'Category 1', image: '/assets/images/product1.jpg', content: 'Content of Product 1', selected: false },
    { id: 2, name: 'Product 2', image: '/assets/images/product2.jpg', content: 'Content of Product 2', selected: false }
  ];

  selectedCategory: any = {};
  modalTitle: string = '';
  showAddNewCategoryModal: boolean = false;
  showDetailCategoryModal: boolean = false;
  showUpdateCategoryModal: boolean = false;
  showDeleteCategoryModal: boolean = false;
  currentPage: number = 1;
  totalPages: number = 5;
  pageName: string = 'categories';

  toggleSelectAll() {
    const allSelected = this.categories.every(category => category.selected);
    this.categories.forEach(category => category.selected = !allSelected);
  }

  openAddNewCategoryModal() {
    this.selectedCategory = { id: null, name: '', image: '', content: '', selected: false };
    this.modalTitle = 'Create Category';
    this.showAddNewCategoryModal = true;
  }

  closeModal() {
    this.showAddNewCategoryModal = false;
    this.showDetailCategoryModal = false;
    this.showUpdateCategoryModal = false;
    this.showDeleteCategoryModal = false;
  }

  saveCategory(category: any) {
    if (this.modalTitle === 'Create Category') {
      category.id = this.categories.length + 1;
      this.categories.push(category);
    } else {
      const index = this.categories.findIndex(p => p.id === category.id);
      this.categories[index] = category;
    }
    this.closeModal();
  }

  viewCategory(id: number) {
    const category = this.categories.find(c => c.id === id);
    console.log("Category", category)
    this.selectedCategory = { ...category };
    this.modalTitle = 'View Category';
    this.showDetailCategoryModal = true;
  }

  editCategory(id: number) {
    const category = this.categories.find(c => c.id === id);
    this.selectedCategory = { ...category };
    this.modalTitle = 'Edit Category';
    this.showUpdateCategoryModal  = true;
  }

  deleteCategory(id: number) {
    this.selectedCategory = this.categories.find(c => c.id === id);
    this.modalTitle = 'Delete Category';
    this.showDeleteCategoryModal = true;
  }

  confirmDelete(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
    this.closeModal();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
