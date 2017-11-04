class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.references :stock, foreign_key: true
      t.references :order, foreign_key: true
      t.string :size

      t.timestamps
    end
  end
end
