import Modal from "../Layouts/Components/Modal";
import Select from "../Layouts/Components/Select";
import Button from "../Layouts/Components/Button";
import Form from "../Layouts/Components/Form";

const ModalRencanaStudi = ({ isOpen, onClose, onSubmit, form, onChange, mataKuliah, dosen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tambah Kelas">
      <Form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="mata_kuliah_id">Mata Kuliah</label>
            <Select
              id="mata_kuliah_id"
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={onChange}
              required
            >
              <option value="">Pilih Mata Kuliah</option>
              {mataKuliah.map((m) => (
                <option key={m.id} value={m.id}>{m.name} ({m.sks} SKS)</option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="dosen_id">Dosen Pengampu</label>
            <Select
              id="dosen_id"
              name="dosen_id"
              value={form.dosen_id}
              onChange={onChange}
              required
            >
              <option value="">Pilih Dosen</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Select>
          </div>

          <div className="text-right">
            <Button type="submit">Simpan</Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalRencanaStudi;
