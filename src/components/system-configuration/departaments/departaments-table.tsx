'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetAllDepartaments } from '@/hooks';

interface Department {
  id: number;
  name: string;
  description: string;
  departmentProgramId: number;
  budgetCodeId: number;
  departmentHeadId: string | null;
}

export default function DepartmentsTable() {
  const { departments } = useGetAllDepartaments();
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(
    null,
  );

  const handleEdit = (department: Department) => {
    if (department) {
      setEditingDepartment({ ...department });
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (id) {
      setDepartmentToDelete(id);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmEdit = () => {
    setIsEditModalOpen(false);
  };
  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 border rounded shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Programa ID</TableHead>
            <TableHead>Código Presupuesto</TableHead>
            <TableHead>Jefe ID</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(departments) && departments.length > 0 ? (
            departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.description}</TableCell>
                <TableCell>{department.departmentProgramId}</TableCell>
                <TableCell>{department.budgetCodeId}</TableCell>
                <TableCell>{department.departmentHeadId || 'N/A'}</TableCell>
                <TableCell>
                  <div className='flex'>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(department)}
                      className="mr-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(department.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No hay departamentos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Departamento</DialogTitle>
          </DialogHeader>
          {editingDepartment && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmEdit();
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={editingDepartment.name}
                    onChange={(e) =>
                      setEditingDepartment({
                        ...editingDepartment,
                        name: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="description"
                    value={editingDepartment.description}
                    onChange={(e) =>
                      setEditingDepartment({
                        ...editingDepartment,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* Add more fields as needed */}
              </div>
              <DialogFooter>
                <Button type="submit">Guardar cambios</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este departamento? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
function setIsEditModalOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}
