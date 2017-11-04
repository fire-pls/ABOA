class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.references :category, foreign_key: true
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
