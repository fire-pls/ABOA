class CartPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    record.user == user
  end

  def checkout?
    record.user == user
  end

  def update?
    record.user == user
  end

end
